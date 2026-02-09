export default function SadHeartAnimation() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="animate-in fade-in zoom-in duration-500">
        <img 
          src="/assets/generated/sad-heart-transparent.dim_200x200.png"
          alt="Sad heart"
          className="w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl animate-bounce"
        />
      </div>
    </div>
  );
}
