require 'rails_helper'

RSpec.feature "as an authenticated user", js: :true do
  before do
    @user1 = create(:user)
    @user2 = create(:user)
    @link1 = create(:link, user_id: @user1.id)
    @link2 = create(:link, url: "http://someothersite.com", title: "some other site", user_id: @user2.id)
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(@user1)
  end
  scenario "i can only see my own links" do
    visit root_path
    expect(current_path).to eq(root_path)
    expect(page).to have_content("Welcome: #{@user1.email}")
    expect(page).to have_content("Signout")

    expect(page).to have_content("#{@link1.title}")
    expect(page).to_not have_content("#{@link2.title}")
    expect(page).to have_content("#{@link1.url}")
    expect(page).to_not have_content("#{@link2.url}")
  end
end
