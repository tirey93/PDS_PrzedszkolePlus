import { AppRoute } from "@/app/router";
import { Link } from "react-router-dom";
import classNames from "classnames";
import classes from "./NavigationItem.module.scss";

type NavigationItemProps = {
    href: AppRoute;
    label: string;
    isActive: boolean;
};

export const NavigationItem = ({ href, label, isActive }: NavigationItemProps) => {
    return (
        <Link to={href} className={classNames(classes.item, { [classes.active]: isActive })}>
            {label}
        </Link>
    );
};
