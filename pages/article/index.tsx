export default function Article() {
    return <div />;
}

export const getServerSideProps = () => {
    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    };
};
