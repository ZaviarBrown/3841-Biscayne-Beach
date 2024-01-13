import { api } from "~/utils/api";
import OpenModalButton from "../Modal/OpenModalButton";
import ConfirmDeletePricingModal from "../Modal/ConfirmDeletePricingModal";

export default function DeletePricingWindow({ id }: { id: string }) {
    const ctx = api.useContext();
    const { mutate } = api.pricing.deleteWindow.useMutation({
        onSuccess: () => ctx.pricing.invalidate(),
    });

    return (
        <OpenModalButton
            modalComponent={<ConfirmDeletePricingModal />}
            buttonText="Delete Price"
            className="m-auto w-fit rounded-lg bg-red-500 px-5 py-2 text-slate-50 shadow-xl duration-200 hover:scale-105 hover:bg-red-600 "
            onModalSubmit={() => mutate(id)}
            onModalClose={() => null}
        />
    );
}
