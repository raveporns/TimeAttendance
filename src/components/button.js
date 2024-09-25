import React from "react";
import "../css/button.css";

const Button = () => {
  return (
    <div className="btn-all">
      <div class="d-grid gap-2 col-6 mx-auto">
        <button class="btn btn-color" type="button">
          การเข้า-ออกงาน
        </button>
        <button class="btn btn-color" type="button">
          การลา
        </button>
        <button class="btn btn-color" type="button">
          การรายงานผล
        </button>
      </div>
    </div>
  );
};

export default Button;
