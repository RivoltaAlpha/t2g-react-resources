export interface MyProps {
  title: string;
  author: string;
}

const Book = (props: MyProps) => {
  return (
    <div>
      <img />
      <h2>{props.title}</h2>
      <p>{props.author}</p>
    </div>
  );
};

export default Book;
