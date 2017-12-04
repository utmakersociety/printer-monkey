class User < Sequel::Model(:users)
  many_to_one :role

  def self.login(email, password)
    return unless email && password
    return unless user = filter(email: email).first
    return unless BCrypt::Password.new(user.password_hash) == password_hash
    true
  end

  def self.password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
  end
end
