// src/widgets/profile/ui/ProfileAvatar.jsx
import Image from 'next/image';

export const ProfileAvatar = ({ src }) => {
  return (
    <div className="mx-4 inline-block">
      <Image
        alt="👨‍💻"
        src={src}
        width={100}
        height={100}
        className="rounded-full object-cover shadow-sm"
        priority
      />
    </div>
  );
};
