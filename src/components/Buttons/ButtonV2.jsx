import { ReactNode } from "react";

/**
 * Primary UI component for user interaction
 */
export const ButtonV2 = ({
  type = "white",
  size = "medium",
  label,
  loading = false,
  iconPos = "left",
  icon,
  contentType = "text",
  className,
  submit,
  children,
  ...props
}) => {
  const mode = `clowny-button--${type}`;

  const loadingClass = loading ? "clowny-button--loading" : "";

  return (
    <button
      type={submit ? "submit" : "button"}
      className={[
        "clowny-button",
        `clowny-button--${size}`,
        loadingClass,
        mode,
        className,
        contentType === "icon" ? "clowny-button-circular" : "",
      ].join(" ")}
      {...props}
    >
      {/* Icon left rendering */}
      {iconPos === "left" && (
        <IconButton icon={icon} iconPos="left" loading={loading} />
      )}
      {label}
      {children}
      {/* Icon right rendering */}
      {iconPos === "right" && (
        <IconButton icon={icon} iconPos="right" loading={loading} />
      )}
      {/* Icon center rendering */}
      {iconPos === "center" && (
        <IconButton icon={icon} iconPos="center" loading={loading} />
      )}
    </button>
  );
};

export const PublicButton = ({
  type,
  size = "medium",
  label,
  loading = false,
  iconPos = "left",
  icon,
  contentType = "text",
  className,
  submit,
  children,
  disabled,
  ...props
}) => {
  const disableCN = disabled
    ? "bg-gray-300 cursor-not-allowed"
    : " bg-primaryColor hover:bg-secondaryColor";
  const mode = `clowny-button--${type}`;
  const sizeCss =
    size === "medium" ? "text-base py-5 px-8" : "px-4 py-2 text-xs";
  return (
    <button
      disabled={disabled}
      {...props}
      className={`${
        disabled ? disableCN : mode
      } ${sizeCss} w-full shadow-md transition-all duration-300  text-white rounded-full flex items-center justify-center`}
    >
      {label}
      {children}
    </button>
  );
};

const IconButton = ({ icon, iconPos, loading }) => {
  return loading || icon ? (
    <span className={`clowny-button-icon clowny-button-icon--${iconPos}`}>
      {loading ? (
        <svg
          className="animate-spin"
          viewBox="0 0 1024 1024"
          fill="currentColor"
        >
          <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
        </svg>
      ) : (
        icon && icon
      )}
    </span>
  ) : (
    <></>
  );
};
