import React, { useState } from "react";
import { Button } from "./button";
import { Input, InputProps } from "./input";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          {...props}
          type={showPassword ? "text" : "password"}
          placeholder={showPassword ? "password" : "***********"}
          ref={ref}
        />
        <Button
          type="button"
          variant="link"
          title={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-1/2 -translate-y-1/2 transform text-muted-foreground"
        >
          {showPassword ? (
            <EyeOff className="size-5" />
          ) : (
            <Eye className="size-5" />
          )}
        </Button>
      </div>
    );
  },
);

export default PasswordInput;
