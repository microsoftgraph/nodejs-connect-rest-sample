
var emailContent = "<html><head> <meta http-equiv=\'Content-Type\' content=\'text/html; charset=us-ascii\'> <title></title> </head><body style=\'font-family:calibri\'> <p>Congratulations {$_SESSION['given_name']},</p> <p>This is a message from the Office 365 Connect sample. You are well on your way to incorporating Office 365 services in your apps. </p> <h3>What&#8217;s next?</h3> <ul><li>Check out <a href=\'http://dev.office.com\' target=\'_blank\'>dev.office.com</a> to start building Office 365 apps today with all the latest tools, templates, and guidance to get started quickly.</li><li>Head over to the <a href=\'https://msdn.microsoft.com/office/office365/howto/office-365-unified-api-reference\' target=\'blank\'>unified API reference on MSDN</a> to explore the rest of the APIs.</li><li>Browse other <a href=\'https://github.com/OfficeDev/\' target=\'_blank\'>samples on GitHub</a> to see more of the APIs in action.</li></ul> <h3>Give us feedback</h3> <ul><li>If you have any trouble running this sample, please <a href=\'\' target=\'_blank\'>log an issue</a>.</li><li>For general questions about the Office 365 APIs, post to <a href=\'http://stackoverflow.com/\' target=\'blank\'>Stack Overflow</a>. Make sure that your questions or comments are tagged with [office365].</li></ul><p>Thanks and happy coding!<br>Your Office 365 Development team </p> <div style=\'text-align:center; font-family:calibri\'> <table style=\'width:100%; font-family:calibri\'> <tbody> <tr> <td><a href=\'https://github.com/OfficeDev/O365-PHP-Unified-API-Connect\'>See on GitHub</a> </td> <td><a href=\'https://officespdev.uservoice.com/forums/224641-general/category/72301-documentation-guidance\'>Suggest on UserVoice</a> </td> <td><a href=\'http://twitter.com/share?text=I%20just%20started%20developing%20apps%20for%20%23PHP%20using%20the%20%23Office365%20Connect%20app%20%40OfficeDev&amp;url=https://github.com/OfficeDev/O365-PHP-Unified-API-Connect\'>Share on Twitter</a> </td> </tr> </tbody> </table> </div>  </body> </html>";

function wrapEmail(content, recipient) {
	var emailAsPayload = {
		Message: {
			Subject: 'Welcome to Office 365 development with PHP and the Office 365 Connect sample',
			Body: {
				ContentType: 'HTML',
				Content: content
			},
			ToRecipients: [
				{
					EmailAddress: {
						Address: recipient
					}
				}
			]
		},
		SaveToSentItems: true
	};
	return emailAsPayload;
}

function sendMail(recipient) {
	var emailPayload = wrapEmail(emailContent, recipient);
}