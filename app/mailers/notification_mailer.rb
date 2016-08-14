class NotificationMailer < ApplicationMailer

  def awaiting_response(user, post)
    @user = user
    @post = post
    @post.viewer_id = @user.id
    @url = "http://localhost:3000/sign_in"
    mail(to: @user.email, subject: "You have a new message in a bottle...")
  end
end
