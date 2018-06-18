from bpy import context, data, ops

import argparse
from datetime import datetime
import logging
import math
import os
import sys


context.scene.unit_settings.system='METRIC'
scene = context.scene
camera = data.objects["Camera"]

def command_args():
    parser = argparse.ArgumentParser()
    try:
        index = sys.argv.index("--") + 1
    except ValueError:
        index = len(sys.argv())
    
    args = parse.parse_args(sys.argv[index:]).__dict__
    
    return args

# clear the scene by delete lamp and default cube
def delete_by_obj_name(name):
    scene = context.scene
    for ob in scene.objects:
        if ob.type == 'MESH' and ob.name.startswith(name):
            ob.select = True
        else: 
            ob.select = False

    ops.object.delete()

delete_by_obj_name("Cube")
delete_by_obj_name("Lamp")



def open_mesh(path, scale=0.9):
    # open an stl file and the select it
    ops.import_mesh.stl(filepath=path, filter_glob="*.stl")
    mesh = context.selected_objects[0]
    mesh.select = True
    # prevent scaling if mesh is max sizes
    max_length = max(mesh.dimensions)
    if max_length == 0:
        pass
    else:
        scale_factor = 1 / (max_length / scale)
        mesh.scale = (scale_factor, scale_factor, scale_factor)
    # set mesh to center of the origin
    ops.object.origin_set(type="GEOMETRY_ORIGIN")
    return mesh

mesh = open_mesh("")



material = data.materials.new(name="ObjectColoring")

# move camera to show model in view
for obj in scene.objects:
    obj.select = False
for obj in context.visible_objects:
    if not (obj.hide or obj.hide_render):
        obj.select = True

ops.view3d.camera_to_view_selected()

# Create new lamp datablock
lamp_data = data.lamps.new(name="New Lamp", type='POINT')

# Create new object with our lamp datablock
lamp_object = data.objects.new(name="New Lamp", object_data=lamp_data)

# Link lamp object to the scene so it'll appear in this scene
scene.objects.link(lamp_object)

lamp_object.location = (camera.location.x-15, camera.location.y-5, camera.location.z-5)

# And finally select it make active
lamp_object.select = True
scene.objects.active = lamp_object

# apply material to mesh and make it blue
mesh.data.materials.append(material)
data.materials['ObjectColoring'].diffuse_color = (0, 1,100)

camera.location = (camera.location.x+0.5, camera.location.y-0.3, camera.location.z+0.3)
render = context.scene.render
render.filepath = 'C:/\/Users/\/mille/\/Documents/\/Projects/\/img.png'
render.resolution_x = 1920 #perhaps set resolution in code
render.resolution_y = 1080
render.resolution_percentage = 100
ops.render.render(write_still=True)
