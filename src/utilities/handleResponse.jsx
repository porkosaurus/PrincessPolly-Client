const handleResponse = async (response) => {
    if (response.ok) {
      return;
    } else {
      const errorData = await response.json();
      console.log(errorData.error);
      // Perform the redirect based on the error
      if (response.status === 401) {
        // Unauthorized, redirect to the login page
        window.location.href = '/login';
      } else {
        // Handle other errors
        // ...
      }
    }
  };

export default handleResponse;