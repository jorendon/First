import SnackMessage from "../components/SnackMessage/SnackMessage.jsx";

 function useToast() {

  function info (message)  {
    return (<SnackMessage message={message} type={'info'} />);
  };
  const success =  (message) =>(<SnackMessage message={message} type='success' />);
  const warning =   (message) =>(<SnackMessage message={message} type='warning' />);
  const error  =   (message) =>(<SnackMessage message={message} type='error' />);
  return {
    info,
    success,
    warning,
    error,
  };
}

export default useToast;
