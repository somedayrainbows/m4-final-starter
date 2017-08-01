require "rails_helper"

RSpec.describe "can mark links as read", js: :true do
  before do
    user = create(:user)
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
  end
  xscenario "Mark a link as read" do
    visit root_path
    fill_in('Enter the url of the link', with: 'http://airbnb.com')
    fill_in('Enter a title', with: 'AirBnB')
    click_link_or_button "Add Link"

    expect(page).to have_content("false")

    sleep 20

    click_link_or_button("read-button")

    expect(page).to have_content("Mark as unread")
    expect(page).to have_content("AirBnB")
  end
end
