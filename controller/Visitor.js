import requestIp from "request-ip";

import { AllVisitor } from "../model/AllVisitor.js";
import { Visitor } from "../model/Visitors.js";

export const incCounter = async (req, res) => {
    try {
        var clientIp = requestIp.getClientIp(req);

        var data = {};

        const allVisitors = await AllVisitor.findOne({});
        if(!allVisitors) {
            var newAllvisitor = new AllVisitor({
                total: 1,
                timestamp: [Date.now()],
            });
            await newAllvisitor.save();
            data = {...data, allVisitors: newAllvisitor}
        } else {
            allVisitors.total += 1;
            allVisitors.timestamp.unshift(Date.now());
            await allVisitors.save();
            data = {...data, allVisitors}
        }
        
        const visitor = await Visitor.findOne({ ip: clientIp });
        if (!visitor) {
            let newvisitor = new Visitor({
                ip: clientIp,
                timestamp: [Date.now()],
                total: 1,
            });
            await newvisitor.save();

            data = {
                ...data,
                visitors: {
                    total: newvisitor.total,
                    timestamp: newvisitor.timestamp,
                    _id: newvisitor._id,
                },
            };

            // console.log(newvisitor);
            // res.status(200).json({
            //     success: true,
            //     message: "Welcome for the First Time",
            //     // visitors: newvisitor             it send ip also... so selected only require items
            //     visitors: {
            //         total: newvisitor.total,
            //         timestamp: newvisitor.timestamp,
            //         _id: newvisitor._id
            //     },
            //     allVisitors: newAllvisitor,
            // });
        } else {
            visitor.total += 1;
            visitor.timestamp.unshift(Date.now());
            await visitor.save();

            data = { ...data, visitors: visitor };
            
            // res.status(200).json({
            //     success: true,
            //     message: "Incremented by one",
            //     visitors: visitor,
            //     allVisitors,
            // });
        }

        const uniqueVisitorCount = await Visitor.countDocuments({});
        
            data = { ...data, uniqueVisitor: { total: uniqueVisitorCount } };
        // console.log(data);
        res.status(200).json({
            success: true,
            message: "Incremented by one",
            vistorData: data,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
