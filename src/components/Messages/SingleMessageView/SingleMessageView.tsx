import { SingleMessageViewTypes } from "../messagesType";

export default function SingleMessageView({
  message,
  userName,
}: SingleMessageViewTypes) {
  return (
    <div>
      <div>
        {userName} : {message}
      </div>
    </div>
  );
}
