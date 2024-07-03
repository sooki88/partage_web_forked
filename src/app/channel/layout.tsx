interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return <main className="min-w-[375px] grow px-5 tablet:px-10">{children}</main>;
};

export default layout;
