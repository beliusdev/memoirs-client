export default function getErrorMessage(error) {
  console.log('error:', error);

  return (
    (error.response && error.response.data.message) ||
    'Something went wrong\nPlease reload the page.'
  );
}
