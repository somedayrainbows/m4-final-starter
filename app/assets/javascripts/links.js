$(function () {
  const $links = $('#my-links')

  $.ajax({
    type: 'GET',
    url: '/api/v1/links',
    success: function(links) {
      $.each(links, function(i, link) {
        $links.append('<li>Title: '+ link.title +', url: '+ link.url + '</li>')
      })
    },
    error: function() {
      alert('error loading links')
    }
  })

  $('#new-link-form').submit(function(e) {
    e.preventDefault()
    const $link = {
      url: $('#new-link-form #link_url').val(),
      title: $('#new-link-form #link_title').val()
    }
    console.log($link)
   $.ajax({
     type: 'POST',
     url: '/api/v1/links',
     data: $link,
     success: function(newLink) {
       $links.append('<li>Title: '+ newLink.title +', url: '+ newLink.url + '</li>')
     },
     error: function() {
       alert('error saving link')
     }
   })
 })
 })

//  function makeLinkMarkup(data){
//    return `<div class="link" data-link-id="${data.id}">
//           <h3 class="title" data-title="${data.title}">Title: ${data.title}</h4><br>
//           <h3 class="url" data-url="${data.url}">URL: <a href="${data.url}">${data.url}</a></h4><br>
//           <h4>Read?: ${data.read}</h4><br>
//           <button type="button" class="edit-link-button">Edit</button>
//           </div>`
// }

// function postLink() {
//   var linkData = {
//     link: {
//       url: $(".new-link-form #link_url").val(),
//       title: $(".new-link-form #link_title").val()
//     }
//   }
//
//   $.ajax({
//     url: "/links",
//     mthod: "POST",
//     data: linkData
//   })
//   .done(function(newLinkMarkup) {
//     $(".my_links").append(newLinkMarkup);
//     $("#link_url").val("");
//     $("#link_title").val("")
//   })
// }
//
// function bindSubmitListenerAndPostLink() {
//   $(".new-link-form #add-link").on("click", function(event) {
//     event.preventDefault()
//     $(".new-link-form").hide()
//     postLink()
//   })
// }
//
// function newLinkForm() {
//   $('.new-link-button').on("click", function(event) {
//     event.preventDefault()
//     $(this).next("div").show()
//   })
// }
//
// $(document).ready(function() {
//   newLinkForm()
//   bindSubmitListenerAndPostLink()
// })
