import Form from "./Form";
import "./SendMessage.scss";

const SendMessage = ({ donorData }) => {
  return (
    <div className="send-message">
      <div className="send-message-wrapper">
        <div className="send-message-info">
          <h3>Show your support feature</h3>
          <p>Available now</p>
          <p>Easily send messages to those that have given</p>
        </div>

        <div className="send-message-form">
          <Form donorData={donorData} />
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
