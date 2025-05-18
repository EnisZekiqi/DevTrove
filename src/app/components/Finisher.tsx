'use client';

const Finisher = () => {
  return (
    <section id="explore" className="relative py-30 px-4">
      <div className="relative max-w-6xl mx-auto overflow-hidden rounded-3xl shadow-xl border border-[#99999957]">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="https://framerusercontent.com/assets/lr4LSmXa1klevAvb0jf1i2zsDE.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="relative z-10 bg-black/60 backdrop-blur-sm text-white p-14 sm:p-18 text-center rounded-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Every dev tool you need. All in one place.
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-lg">
            Whether you’re building a side project, prepping for interviews, or launching a startup — DevTrove has you covered.
          </p>
          <button
             className="explore mt-6 px-4 py-2 sm:px-6 sm:py-3 border border-white/40 bg-[#0251EF] cursor-pointer scale-100 hover:scale-105 text-white font-semibold rounded-xl transition-all duration-200"
           >
             Explore Features
         </button>
        </div>
      </div>
    </section>
  );
};

export default Finisher;
