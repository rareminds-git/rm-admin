import Alert from 'react-bootstrap/Alert';

function SuccessBanner() {
  return (
    <>
      <Alert className="successMessageAlert" key={'success'} variant={'success'}>
        Data Submitted Successfully.
      </Alert>
    </>
  );
}

export default SuccessBanner;
