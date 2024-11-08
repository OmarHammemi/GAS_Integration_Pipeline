function doGet(e) {
    var response = {
      status: 'success',
      data: []
    };
  
    try {
      // Example: Collect data from Gmail (e.g., recent emails)
      var threads = GmailApp.getInboxThreads(0, 5);  // Get the first 5 threads
      response.data = threads.map(function(thread) {
        return {
          subject: thread.getFirstMessageSubject(),
          from: thread.getMessages()[0].getFrom(),
          date: thread.getLastMessageDate()
        };
      });
    } catch (e) {
      response.status = 'error';
      response.message = e.message;
    }
  
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  }
  