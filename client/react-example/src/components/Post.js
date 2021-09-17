import { Card } from "react-bootstrap";

const timeConverter = (UNIX_timestamp) => {
  var a = new Date(UNIX_timestamp);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
};

const Post = ({ post }) => {
  const { name, text, dateCreated } = post;
  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {timeConverter(dateCreated)}
        </Card.Subtitle>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
