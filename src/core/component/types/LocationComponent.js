import { COMPONENT_TYPES, X, Y } from "../../consts";
import Component from "../Component";

export default class LocationComponent extends Component {
  x;
  y;

  constructor({ x, y }) {
    super("LOCATION_COMPONENT");
    this.x = x;
    this.y = y;
    this.setAttributes({ x, y });
  }

  setAttributes({ x, y }) {
    this.x = x;
    this.y = y;
  }
}
