class ConnectedApp < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :user_id, :key

  before_create do
    self.set_key
  end

  def set_key
    return if key.present?
    self.key = generate_key
    self.save!
  end

  private
  # Below this line thar be Dragons
  #

  def generate_key
    loop do
      key = SecureRandom.hex
      break key unless self.class.exists?(key: key)
    end
  end
end
