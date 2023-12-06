$(document).ready(function () {
  // Initialize popover
  $('#quoteButton').popover({
    trigger: 'click',
    html: true,
    placement: 'right',
    content: async function () {
      // Show initial "Wait" message
      const waitMessage = '<p class="loading-message">Wait...</p>';
      $(this).attr('data-content', waitMessage).popover('hide').popover('show');

      try {
        // Fetch random quote from the Quotable API
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();

        // Update popover content with the fetched quote
        const quoteContent = `
          <div class="quote-container">
            <p class="quote-text">${data.content}</p>
            <p class="quote-author text-muted">- ${data.author}</p>
          </div>`;

        // Set the content and hide/show the popover to update
        $(this).attr('data-content', quoteContent).popover('hide').popover('show');

        // Return the formatted quote content
        return quoteContent;
      } catch (error) {
        console.error('Error fetching quote:', error);

        // Display an error message if fetching fails
        const errorMessage = '<p class="error-message">Error fetching quote.</p>';
        $(this).attr('data-content', errorMessage).popover('hide').popover('show');

        return errorMessage;
      }
    },
  });
});
