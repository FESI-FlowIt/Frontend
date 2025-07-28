export default function CustomLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative h-96 w-96">
        {[...Array(8)].map((_, i) => {
          const angle = (i * Math.PI) / 4;
          const top = `${50 - 40 * Math.cos(angle)}%`;
          const left = `${50 + 40 * Math.sin(angle)}%`;
          const delay = `${i * 0.1}s`;

          return (
            <div
              key={i}
              className="animate-custom-spin bg-primary-01 absolute h-12 w-12 rounded-full"
              style={{
                top,
                left,
                animationDelay: delay,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
