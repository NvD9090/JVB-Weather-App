import { ClipLoader } from "react-spinners";

type Props = {
    isLoading?: boolean
}

const LoadingSpinner = ({ isLoading = true }: Props) => {
    return (
        <div id="loading-spinner">
            <ClipLoader
                color="36#d7b7"
                loading={isLoading}
                size={35}
            />
        </div>
    )
}

export default LoadingSpinner
