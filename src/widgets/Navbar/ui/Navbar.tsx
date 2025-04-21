import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = (props: NavbarProps) => {
  const { className } = props;

  return (
    <div className={`${cls.navbar} ${className}`}>
      <div className={cls.links}></div>
    </div>
  );
};
