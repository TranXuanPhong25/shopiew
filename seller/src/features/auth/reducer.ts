import { User, Shop } from "./models";

// Use reducer to batch state updates
interface AuthState {
   user: User | null;
   shop: Shop | null;
   loading: boolean;
}

type AuthAction =
   | { type: 'SET_LOADING'; payload: boolean }
   | { type: 'SET_AUTH_DATA'; payload: { user: User; shop: Shop | null } }
   | { type: 'SET_USER'; payload: User | null }
   | { type: 'SET_SHOP'; payload: Shop | null }
   | { type: 'RESET_AUTH' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
   switch (action.type) {
      case 'SET_LOADING':
         return { ...state, loading: action.payload };
      case 'SET_AUTH_DATA':
         return {
            ...state,
            user: action.payload.user,
            shop: action.payload.shop,
            loading: false
         };
      case 'SET_USER':
         return { ...state, user: action.payload };
      case 'SET_SHOP':
         return { ...state, shop: action.payload };
      case 'RESET_AUTH':
         return { user: null, shop: null, loading: false };
      default:
         return state;
   }
};
export { authReducer };