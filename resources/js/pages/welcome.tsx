const Welcome = ({ user }: { user: { name: string } }) => {
    return <h1>Welcome {user.name}</h1>;
};

export default Welcome;
