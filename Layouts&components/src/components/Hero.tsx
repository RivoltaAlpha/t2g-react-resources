export const Hero = () => {
  return (
    <div className="flex flex-col gap-20">
      <section className="flex flex-col gap-20">
        <div>
        <h1 className="text-8xl"> We're coming soon</h1>
        </div>
        <div>
        <p className="text-pink-700">
          Hello fellow shoppers! We're currently building our new fashion store.
          Add your email below to stay up-to-date with announcements and our
          launch deals.
        </p>
        </div>
      </section>
      <section>
        <form className="flex justify-between gap-2 border rounded-xl">
          <input className="flex-1 ml-4" type="email" placeholder="Email Address" />
          <button className="bg-pink-700 text-white p-4 rounded-xl" type="submit">Notify Me</button>
        </form>
      </section>
      <section className="grid grid-cols-4 grid-rows-2 gap-4">
        <div className="flex justify-between gap-2 border rounded-xl">
          <button className="bg-pink-700 text-white p-4 rounded-xl" type="submit">Notify Me</button>
        </div>
        <div className="flex justify-between gap-2 border rounded-xl">
          <button className="bg-pink-700 text-white p-4 rounded-xl" type="submit">Notify Me</button>
        </div>
        <div className="flex justify-between gap-2 border rounded-xl">
          <button className="bg-pink-700 text-white p-4 rounded-xl" type="submit">Notify Me</button>
        </div>
        <div className="flex justify-between gap-2 border rounded-xl">
          <button className="bg-pink-700 text-white p-4 rounded-xl" type="submit">Notify Me</button>
        </div>
        <div className="flex justify-between gap-2 border rounded-xl">
          <button className="bg-pink-700 text-white p-4 rounded-xl" type="submit">Notify Me</button>
        </div>
        <div className="flex justify-between gap-2 border rounded-xl">
          <button className="bg-pink-700 text-white p-4 rounded-xl" type="submit">Notify Me</button>
        </div>
        <div className="flex justify-between gap-2 border rounded-xl">
          <button className="bg-pink-700 text-white p-4 rounded-xl" type="submit">Notify Me</button>
        </div>
        <div className="flex justify-between gap-2 border rounded-xl">
          <button className="bg-pink-700 text-white p-4 rounded-xl" type="submit">Notify Me</button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
