require 'rails_helper'

RSpec.feature "as an authenticated user", js: :true do
  before do
    @user = create(:user)
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(@user)
  end
  scenario "i can see a form to submit a link" do
    visit root_path
    expect(current_path).to eq(root_path)
    expect(page).to have_content("Welcome: #{@user.email}")
    expect(page).to have_content("Signout")

    expect(page).to have_field("Enter the url of the link")
    expect(page).to have_field("Enter a title")
    expect(page).to have_button("Add Link")
  end
end
