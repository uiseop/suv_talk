type TitleProps = {
    children: React.ReactNode;
};

const Title = ({ children }: TitleProps) => {
    return <h1>{children}</h1>;
};

export default Title;
