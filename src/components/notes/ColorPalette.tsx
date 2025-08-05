import { GOAL_COLOR_OPTIONS } from '@/constants/goalColors';

interface ColorPaletteProps {
  onSelectColor: (color: string) => void;
}

const ColorPalette = ({ onSelectColor }: ColorPaletteProps) => {
  return (
    <div
      className="rounded-8 border-line absolute bottom-full left-0 z-50 mb-2 border-1 bg-white p-8 shadow-lg"
      style={{ minWidth: '240px' }}
    >
      <div className="flex flex-wrap gap-8">
        {Object.values(GOAL_COLOR_OPTIONS).map(color => (
          <button
            key={color}
            type="button"
            style={{ backgroundColor: `var(${color})` }}
            className="hover:border-primary-01 flex h-24 w-24 transform cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-transform duration-200 hover:scale-110"
            onClick={() => onSelectColor(color)}
            aria-label={`색상 선택: ${color}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
