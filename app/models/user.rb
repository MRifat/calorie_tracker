class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :meals

  validates_presence_of :first_name, :last_name, :daily_calorie_goal

  def humanized_name
    return "#{self.first_name} #{self.last_name}"
  end
end
