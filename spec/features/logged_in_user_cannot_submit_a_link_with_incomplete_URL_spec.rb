require 'rails_helper'

RSpec.feature "as an authenticated user", :js => :true do
  before do
    @user = create(:user)
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(@user)
  end
  scenario "i cannot submit a link without http:// prefix" do
    visit root_path
    expect(current_path).to eq(root_path)
    expect(page).to have_content("Welcome: #{@user.email}")
    expect(page).to have_content("Signout")

    fill_in('Enter the url of the link', with: 'airbnb.com')
    fill_in('Enter a title', with: 'AirBnB')
    click_link_or_button "Add Link"

    expect(page).to_not have_content("AirBnB")
    expect(page).to_not have_content("airbnb.com")
  end
end
