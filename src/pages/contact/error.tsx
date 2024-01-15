export default function ContactError({ error }: { error: Error }) {
    console.log(error);

    return <div>Uh oh</div>;
}
