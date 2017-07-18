require 'rails_helper'

RSpec.feature "Add Link", :type => :feature, :js => true do
  before do
    @user = create(:user)
    @link = create(:link, user_id: @user.id)
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(@user)
  end

  scenario "posts a new link" do
    visit root_path
    fill_in "link[url]", :with => "http://airbnb.com"
    fill_in "link[title]", :with => "AirBnB"
    click_link_or_button "Add Link"

    sleep(2)

    within(".my_links") do
      expect(page).to have_content("http://airbnb.com")
      expect(page).to have_content("AirBnB")
    end
  end
end
