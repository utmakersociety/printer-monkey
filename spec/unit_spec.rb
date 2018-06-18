require 'rspec/core'
require 'rspec/expectations'

describe User do
  before(:each) do
    @user = User.create(:name => 'Moose')
  end

  it 'associations should be correct' do
    expect(@user.roles).to eq []
  end
end

describe Role do
  before(:each) do
    @role = Role.create(:name => 'Moose')
    @role = Role.create(:name => 'Cool', :user_id => @user.id)
  end

  it 'associations should be correct' do
    expect(@role.user.class).to eq User 
  end
end
