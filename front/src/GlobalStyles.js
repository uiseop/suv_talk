import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    a {
        text-decoration : none;
        color : inherit;
    }
	body {
	        font-family : apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell , 'Helvetica Neue', sans-serif;
            max-width: 700px;
            margin: 0 auto;
	}
    main {
        padding: 1rem;
    }
`;

export default GlobalStyles;
