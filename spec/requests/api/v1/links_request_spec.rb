# require 'rails_helper'
#
# describe "links api" do
#   it "can return a list of links" do
#     create_list(:link, 4)
#
#     get "/api/v1/links"
#
#     expect(response).to be_success
#
#     links = JSON.parse(response.body)
#
#     expect(links).to be_an(Array)
#     expect(links.first).to have_key("url")
#     expect(links.first).to have_key("title")
#     expect(links.first).to have_key("read")
#     expect(links.first).to have_key("user_id")
#   end
#
#   it "can return a link by its id" do
#     link1 = create(:link)
#
#     get "/api/v1/links/#{link1.id}"
#
#     link = JSON.parse(response.body)
#
#     expect(response).to be_success
#
#     expect(link["id"]).to eq(link1.id)
#     expect(link).to have_key("url")
#     expect(link).to have_key("title")
#     expect(link).to have_key("read")
#     expect(link).to have_key("user_id")
#   end
#
#   it "can create a link" do
#     user = create(:user)
#
#     allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
#
#     link_params = { url: "http://youtube.com", title: "youtube" }
#
#     post "/api/v1/links", params: { post: link_params}
#
#     expect(response.code).to eq("201")
#
#     link = JSON.parse(response.body)
#
#     expect(link).to be_a(Hash)
#     expect(link["link"]["url"]).to eq("http://youtube.com")
#     expect(link["link"]["title"]).to eq("youtube")
#     expect(link["link"]["user_id"]).to eq(user.id)
#   end
#
#   it "can update a link" do
#     user = create(:user)
#     link = create(:link, user_id: user.id)
#     allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
#
#     link_params = { url: "#{link.url}", title: "#{link.title}" }
#
#     allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
#
#     put "/api/v1/links/#{link.id}"
#
#     expect(response.code).to eq("204")
#     expect(Link.count).to eq(1)
#   end
# end
