require 'rails_helper'

RSpec.feature "Add Link", :type => :feature, :js => true do
  before do
    user = create(:user)
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
  end
  scenario "posts a new link" do
    visit root_path
    fill_in('Enter the url of the link', with: 'http://airbnb.com')
    fill_in('Enter a title', with: 'AirBnB')
    click_link_or_button "Add Link"

    expect(page).to have_content("http://airbnb.com")
    expect(page).to have_content("AirBnB")
  end
end
