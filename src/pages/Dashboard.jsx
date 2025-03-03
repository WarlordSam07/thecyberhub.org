import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Wrapper } from "../components/Dashboard/Profile/ProfileElements";
import DashboardItems from "../components/Dashboard/DashboardItems";
import { DashboardContainer } from "../components/Dashboard/DashboardElements";
import { CircleSpinner } from "react-spinners-kit";
import UnderMaintenance from "../components/Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "../features/apiStatus";
import DashboardSidebar from "./DashboardSidebar";

const Dashboard = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { isApiLoading, isApiWorking } = apiStatus();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [user, navigate]);

    if (isLoading || isApiLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={20} color={"#1fc10d"} isLoading={isLoading || isApiLoading} />
            </Wrapper>
        );
    }

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <DashboardContainer>
                <DashboardSidebar />
                <DashboardItems />
            </DashboardContainer>
        </Wrapper>
    );
};

export default Dashboard;
