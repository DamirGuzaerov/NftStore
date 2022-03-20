import {FC} from "react";

interface IconProps {
    name: string;
    width: number;
    height: number;
}

const Icon: FC<IconProps> = (props) => {
    const {
        name,
        width = 24,
        height = 24
    } = props;

    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
        >
            <use xlinkHref={`/sprite.svg#${name}`}/>
        </svg>
    );
}
export default Icon