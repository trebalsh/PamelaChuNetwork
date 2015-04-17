<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html lang="en">

<jsp:include page="includes/header.jsp"/>

<body>

<jsp:include page="includes/topmenu.jsp"/>

<div id="mainPanel" class="container">
    <div class="col-offset-2 col-span-8">

        <h1><fmt:message key="pamelaChu.license"/></h1>

        <p><fmt:message key="pamelaChu.copyright"/> <a href="http://www.ippon.fr"><fmt:message
                key="pamelaChu.ippon.technologies"/></a></p>

        <p><fmt:message key="pamelaChu.license.text"/></p>

        <p><a href="http://www.apache.org/licenses/LICENSE-2.0"></a><a
                href="http://www.apache.org/licenses/LICENSE-2.0">http://www.apache.org/licenses/LICENSE-2.0</a></p>

        <p><fmt:message key="pamelaChu.cg"/></p>
    </div>
</div>

</body>
<jsp:include page="includes/footer.jsp"/>
</html>
