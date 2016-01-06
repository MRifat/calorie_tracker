FactoryGirl.define do
  factory :connected_app do
    user
    key SecureRandom.hex
  end
end
