export type CardType = {
  title: string;
  body: string;
};

export default function Card() {
  return (
    <>
      <div className="card">
        <div className="card__title">Card Title</div>
        <div className="card__body">
          Card Body. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quae, similique dignissimos. Quia, optio omnis. Fugit reprehenderit
          facilis ea voluptas voluptatem?
        </div>
      </div>

      <style jsx>{`
        .card {
          background-color: #fff;
          border-radius: 0.5rem;
          box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
          margin: 1rem;
          max-width: 20rem;
          overflow: hidden;
        }
        .card__title {
          padding: 1rem;
        }

        .card__body {
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
