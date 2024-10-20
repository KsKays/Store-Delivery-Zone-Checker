import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faUser,
  faUtensils,
  faPenToSquare,
  faTrash,
  faShop,
} from "@fortawesome/free-solid-svg-icons";

export const HomeIcon = (props) => <FontAwesomeIcon icon={faHome} {...props} />;
export const PenIcon = (props) => (
  <FontAwesomeIcon icon={faPenToSquare} {...props} />
);
export const TrashIcon = (props) => (
  <FontAwesomeIcon icon={faTrash} {...props} />
);
export const UserIcon = (props) => <FontAwesomeIcon icon={faUser} {...props} />;
export const PlusIcon = (props) => <FontAwesomeIcon icon={faPlus} {...props} />;
export const StoreIcon = (props) => (
  <FontAwesomeIcon icon={faShop} {...props} />
);
export const FoodIcon = (props) => (
  <FontAwesomeIcon icon={faUtensils} {...props} />
);
