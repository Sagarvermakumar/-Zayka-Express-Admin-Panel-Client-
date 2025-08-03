// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  

  colors: {
    brand: {
      900: "#8B0000", // dark red
      800: "#A10000",
      700: "#C20000",
    },
    gray: {
      100: "#f5f5f5",
      200: "#e2e2e2",
      300: "#c6c6c6",
      400: "#a0a0a0",
      500: "#7b7b7b",
      600: "#555",
      700: "#333",
      800: "#1f1f1f",
      900: "#121212", // deep dark
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.100",
        fontFamily: "monospace",
        fontSize:{base:'14px', md:"16px",lg:"18px"}
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
        textShadow: "0 1px 2px rgba(0,0,0,0.8)",
      },
      variants: {
        solid: {
          bg: "brand.900",
          color: "gray.100",
          transition: "all 0.2s ease-in-out",
          border: "none",
          outline: "none",
          _focus: {
            boxShadow: "0 0 0 2px rgba(255, 0, 0, 0.6)",
          },
          _hover: {
            bg: "brand.700",
            boxShadow: "0 4px 12px rgba(255, 0, 0, 0.6)",
          },
          _active: {
            transform: "scale(0.98)",
            boxShadow: "0 2px 6px rgba(255, 0, 0, 0.3)",
          },
          _focusVisible: {
            boxShadow: "none",
            border: "none",
            outline: "none",
          },
        },
        outline: {
          // border: "1px solid",
          borderColor: "brand.900",
          color: "brand.900",
          bg: "transparent",
          boxShadow: "0 2px 8px rgba(255, 0, 0, 0.4)",
          transition: "all 0.2s ease-in-out",
          _hover: {
            bg: "brand.900",
            color: "gray.100",
            boxShadow: "0 4px 12px rgba(255, 0, 0, 0.6)",
            border: "none",
          },
          _focusVisible: {
            boxShadow: "none",
            border: "none",
            outline: "none",
          },
          _active: {
            transform: "scale(0.98)",
            boxShadow: "0 2px 6px rgba(255, 0, 0, 0.3)",
            border: "none",
            outline: "none",
            bg: "gray.800",
          },
        },
        ghost: {
          color: "gray.100",
          bg: "transparent",
          boxShadow: "0 2px 8px rgba(255, 0, 0, 0.4)",
          transition: "all 0.2s ease-in-out",
          _hover: {
            bg: "brand.900",
            boxShadow: "0 4px 12px rgba(255, 0, 0, 0.6)",
          },
        },
        link: {
          color: "brand.700",
          textDecoration: "underline",
          textUnderlineOffset: "2px",
          textDecorationThickness: "2px",
          textDecorationColor: "brand.700",
          textShadow: "0 1px 2px rgba(0,0,0,0.8)",
          transition: "all 0.2s ease-in-out",
          fontSize: "16px",
          fontFamily: "Inter, sans-serif",
          fontStyle: "normal",
          fontWeight: "bold",
          lineHeight: "24px",
          letterSpacing: "0.1px",
          outline: "none",
          border: "none",
          boxShadow: "none",

          _focus: {
            boxShadow: "none",
            border: "none",
            outline: "none",
          },
          _focusVisible: {
            boxShadow: "none",
            border: "none",
            outline: "none",
          },
          _hover: {
            textDecoration: "none",
            color: "brand.700",
          },
          _active: {
            transform: "scale(0.98)",
            boxShadow: "0 2px 6px rgba(255, 0, 0, 0.3)",
            border: "none",
            outline: "none",
          },
        },
      },
    },

    Select: {
      baseStyle: {
        field: {
          bg: "gray.800",
          color: "white",
          borderColor: "teal.400",
          _hover: { borderColor: "teal.500" },
          _focus: { borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" },
        },
      },
    },
  },
});

export default theme;
