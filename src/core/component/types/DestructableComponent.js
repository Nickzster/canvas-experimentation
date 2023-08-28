import { COMPONENT_TYPES } from "../../consts";
import Component from "../Component";

export default class DestructableComponent extends Component {
  constructor() {
    super(COMPONENT_TYPES.DESTRUCTABLE_COMPONENT);
  }
}
